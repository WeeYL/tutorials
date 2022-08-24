import { Component } from "./base-component.js"
import { autobind } from "../decorators/autobind.js";
import { Validatable, validate } from "../utils/validation.js";
import {projectState} from '../state/project-state.js'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  inputTitle: HTMLInputElement;
  inputPeople: HTMLInputElement;
  inputDescription: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.hostEl = <HTMLDivElement>document.getElementById("app")!;
    this.templateEl = <HTMLTemplateElement>(
      document.getElementById("project-input")!
    );

    //access
    this.inputTitle = <HTMLInputElement>this.element.querySelector("#title"); // getElementById not support for form
    this.inputPeople = <HTMLInputElement>this.element.querySelector("#people");
    this.inputDescription = <HTMLInputElement>(
      this.element.querySelector("#description")
    );

    this.configure();
    this.renderContent();
  }

  // for submission
  configure() {
    this.element.addEventListener("submit", this.submitHandler); // this.submitHandler.bind(this)
  }

  renderContent() {} // dummy

  @autobind
  submitHandler(event: Event) {
    event.preventDefault(); // do not submit yet
    const userInput = this.userInfo();
    if (Array.isArray(userInput)) {
      const [t, d, p] = userInput;
      projectState.addProject(t, d, p);
    }
  }

  userInfo(): [string, string, number] | void {
    const t = this.inputTitle.value;
    const d = this.inputDescription.value;
    const p = this.inputPeople.value;

    // set title with interface for validation
    const titleValidatable: Validatable = {
      value: t,
      required: true,
      minLen: 3,
      maxLen: 100,
    };
    const descValidatable: Validatable = {
      value: d,
      required: false,
    };
    const peopleValidatable: Validatable = {
      value: +p, // change to number
      required: true,
      min: 1,
      max: 12,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("can not leave empty");
    }
    return [t, d, +p];
  }
}
