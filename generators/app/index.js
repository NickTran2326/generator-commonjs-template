"use strict";
import Generator from "yeoman-generator";
import { red } from "chalk";
import yosay from "yosay";

export default class extends Generator {
  prompting() {
    this.appname = this.appname.replace(/ /g, ".");
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the cat\'s meow ${red(
          "generator-commonjs-template"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    if (this.appname !== this.props.appname) {
      this.destinationRoot(`./${this.props.appname}`);
    }

    this._writingPackage();
    this._writingReadme();
    this._writingIndexHtml();
    this._writingTsConfig();
    this._writingGitIgnore();
    this._writingLogo();
    this._writingIndexBootstrapApp();
    this._writingFavicon();
    this._writingManifest();
    this._writingApp();
    this._writingEslint();

    this.composeWith(require.resolve("generator-git-init"));
  }

  install() {
    this.installDependencies({ bower: false });
  }

  _writingPackage() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.appname,
        description: this.props.description
      }
    );
  }

  _writingReadme() {
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        name: this.props.appname,
        description: this.props.description
      }
    );
  }

  _writingIndexHtml() {
    this.fs.copyTpl(
      this.templatePath("public/index.html"),
      this.destinationPath("public/index.html"),
      {
        name: this.props.appname
      }
    );
  }

  _writingTsConfig() {
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
  }

  _writingGitIgnore() {
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
  }

  _writingLogo() {
    this.fs.copy(
      this.templatePath("src/logo.png"),
      this.destinationPath("src/logo.png")
    );
  }

  _writingApp() {
    this.fs.copyTpl(
      this.templatePath("src/App.tsx"),
      this.destinationPath("src/App.tsx"),
      {
        name: this.props.appname
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/App.test.tsx"),
      this.destinationPath("src/App.test.tsx"),
      {
        name: this.props.appname
      }
    );
  }

  _writingIndexBootstrapApp() {
    this.fs.copy(
      this.templatePath("src/index.tsx"),
      this.destinationPath("src/index.tsx")
    );
  }

  _writingFavicon() {
    this.fs.copy(
      this.templatePath("public/favicon.ico"),
      this.destinationPath("public/favicon.ico")
    );
  }

  _writingManifest() {
    this.fs.copyTpl(
      this.templatePath("public/manifest.json"),
      this.destinationPath("public/manifest.json"),
      {
        name: this.props.appname
      }
    );
  }

  _writingEslint() {
    this.fs.copy(
      this.templatePath("eslintrc"),
      this.destinationPath(".eslintrc")
    );

    this.fs.copy(
      this.templatePath("eslintignore"),
      this.destinationPath(".eslintignore")
    );
  }
}
