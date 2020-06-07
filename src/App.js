import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";
import { RenderConfirm } from "./components/alert";
import { RenderField, RenderSelect } from "./components/renderfield";

import "./style.css";

import { getSelectData, changeProfile } from "./actions";

const styles = (theme) => ({
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    margin: "12px 0",
    width: "100%",
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleConfirmOpen = this.handleConfirmOpen.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isConfirmOpen: false,
      isAlertOpen: false,
      message: "",
      isSuccess: false,

      name: "",
      email: "",
      kaisha: "",
      busho: "",
      yakushoku: "",
    };
  }

  componentDidMount() {
    this.props.getSelectData();
  }

  handleConfirmOpen = (values) => {
    this.setState({
      isConfirmOpen: true,
      name: values.name,
      email: values.email,
      kaisha: values.kaisha,
      busho: values.busho,
      yakushoku: values.yakushoku,
    });
  };
  handleConfirmClose = () => {
    this.setState({ isConfirmOpen: false });
  };
  async handleSubmit(values) {
    await this.props.changeProfile(values);

    if (this.props.changes === "success") {
      this.setState({
        message: "プロフィール変更を保存しました！",
        isSuccess: true,
      });
      this.handleAlertOpen();
      this.handleConfirmClose();
    } else {
      this.setState({
        message: "プロフィール変更に失敗しました！",
        isSuccess: false,
      });
      this.handleAlertOpen();
      this.handleConfirmClose();
    }
  }
  handleAlertOpen = () => {
    this.setState({ isAlertOpen: true });
  };
  handleAlertClose = () => {
    this.setState({ isAlertOpen: false });
  };

  render() {
    const { handleSubmit, pristine, submitting, invalid, classes } = this.props;
    const severity = this.state.isSuccess ? "success" : "error";
    const dataset = this.props.select;

    return (
      <div>
        <div className="form">
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <p className="form__title">プロフィール変更</p>

          <form onSubmit={handleSubmit(this.handleConfirmOpen)}>
            <FormControl className={classes.formControl}>
              <Field
                label="名前"
                name="name"
                type="text"
                component={RenderField}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Field
                label="メールアドレス"
                name="email"
                type="email"
                component={RenderField}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <Field
                label="会社名"
                name="kaisha"
                type="text"
                component={RenderField}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <Field
                label="部署名"
                name="busho"
                type="text"
                component={RenderField}
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                役職
              </InputLabel>
              <Field label="役職" name="yakushoku" component={RenderSelect}>
                {Array.isArray(dataset) &&
                  dataset.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
              </Field>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={pristine || submitting || invalid}
              fullWidth
            >
              保存
            </Button>

            <RenderConfirm
              isConfirmOpen={this.state.isConfirmOpen}
              handleClose={this.handleConfirmClose}
              handleSubmit={this.handleSubmit}
              name={this.state.name}
              email={this.state.email}
              kaisha={this.state.kaisha}
              busho={this.state.busho}
              yakushoku={this.state.yakushoku}
              message="プロフィール変更を保存しますか？"
              okMessage="保存"
            />
          </form>
        </div>
        <Snackbar
          open={this.state.isAlertOpen}
          autoHideDuration={3000}
          onClose={this.handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={this.handleAlertClose} severity={severity}>
            {this.state.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.name) errors.name = "名前を入力してください。";
  if (!values.email) errors.email = "メールアドレスを入力してください。";
  if (!values.kaisha) errors.kaisha = "会社名を入力してください。";
  if (!values.busho) errors.busho = "部署名を入力してください。";
  if (!values.yakshoku) errors.yakshoku = "役職を選択してください。";

  return errors;
};

const mapStateToProps = (state) => {
  return {
    select: state.select,
    changes: state.change,
    initialValues: {
      yakushoku: state.select[0],
    },
  };
};

const mapDispatchToProps = { getSelectData, changeProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    validate,
    enableReinitialize: true,
    form: "form",
  })(withStyles(styles, { withTheme: true })(Profile))
);
