import { autobind } from "../decorators/autobind.js";
import { Validatable, validate } from "../utils/validation.js";
import { Draggable, DragTarget } from "../models/drag-drop-interfaces.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { ProjectItem } from "../components/project-item.js";

  type Listener<T> = (items: T[]) => void; // each listener run a list of projects

  class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn); // listen for any changes
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    // func

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.active // default
      );

      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: String, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (let listenerFn of this.listeners) {
        listenerFn(this.projects.slice() /* slice makes a copy */);
      }
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  }

    // create a class function to be accessed anywhere
    export const projectState = ProjectState.getInstance(); // create new class

