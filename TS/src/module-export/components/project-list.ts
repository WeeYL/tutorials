import { Component } from "./base-component.js";
import { autobind } from "../decorators/autobind.js";
import { Validatable, validate } from "../utils/validation.js";
import { projectState } from "../state/project-state.js";
import { Draggable, DragTarget } from "../models/drag-drop-interfaces.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { ProjectItem } from "../components/project-item.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    // drag data over
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault(); // default dragover do not allow drop event. preventDefault remove this default behavior
      this.element.querySelector("ul")!.classList.add("droppable"); // add a CSS class
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const id = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      id,
      this.type === "active" ? ProjectStatus.active : ProjectStatus.finished
    ); // ensure state do not change state if dropped into same box
    this.element.querySelector("ul")!.classList.remove("droppable"); // add a CSS class
  }

  @autobind
  dragLeaveHandler(event: DragEvent) {
    this.element.querySelector("ul")!.classList.remove("droppable"); // removes a CSS class
  }
  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      // set project status
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.active;
        }
        return prj.status === ProjectStatus.finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
  listId = `${this.type}-projects-list`;

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.innerHTML =
      this.type.toUpperCase() + "PROJECTS";
  }

  renderProjects() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)!
    );
    listEl.innerHTML = ""; // clear content else duplicates
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(prjItem, this.listId);
    }
  }
}
