import { Component } from "./base-component"
import { autobind } from "../decorators/autobind";
import { Validatable, validate } from "../utils/validation";
import {projectState} from '../state/project-state'
import {Draggable,DragTarget} from '../models/drag-drop-interfaces'
import {Project} from "../models/project-model"
  
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    constructor(private project: Project, hostElId: string) {
      super("single-project", hostElId, false, project.id);

      this.renderContent();
      this.configure();
    }
    get persons() {
      if (this.project.people === 1) {
        return "1 person";
      }
      return `${this.project.people} persons`;
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.persons;
      this.element.querySelector("p")!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(event: DragEvent) {
      // data transfer, ID only
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(_: DragEvent) {
      console.log("DragEnd");
    }
  }
