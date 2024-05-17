import GenericDiffReporterBase from "../GenericDiffReporterBase";
import { createEmptyFileIfNotExists, searchForExecutable } from "../../AUtils";

class Reporter extends GenericDiffReporterBase {
  constructor() {
    super("GitDiff");

    this.exePath = searchForExecutable("Git/cmd", "git");
  }

  report(approved, received, options) {
    options = options || {};

    createEmptyFileIfNotExists(approved);
    console.log(this.exePath);

    options.cmdArgs = ["diff", "--no-index", "--", received, approved];

    // force gitdiff to run synchronously so our console output
    // stays in order of test execution.
    const newOptions = Object.assign({}, options, {
      blockUntilReporterExits: true,
    });

    return super.report(approved, received, newOptions);
  }
}

module.exports = Reporter;
