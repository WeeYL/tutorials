export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;

    constructor(
      templateId: string,
      hostElId: string,
      insertAtStart: boolean,
      newElId: string
    ) {
      this.templateEl = <HTMLTemplateElement>(
        document.getElementById(templateId)!
      );
      this.hostEl = <T>document.getElementById(hostElId)!;

      const importedNode = document.importNode(this.templateEl.content, true);
      this.element = <U>importedNode.firstElementChild;

      this.element.id = newElId;
      if (newElId) {
        this.element.id = newElId;
      }
      this.attach(insertAtStart);
    }

    // func
    abstract configure(): void;
    abstract renderContent(): void;

    // exe func
    private attach(insertAtStart: boolean) {
      this.hostEl.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }
  }
