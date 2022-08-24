import React, { Component } from "react";

class HelloWorld extends Component {
  //state
  state = {
    count: 0,
    name: "Leon",
    imageUrl: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"],
  };

  // function

  // changes fomat of zero
  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }

  // dynamic change button class
  getBadge(count) {
    let classes = "badge m2 badge-";
    classes += count === 0 ? "warning" : "primary";
    console.log(count);
    return classes;
  }
  // conditional rendering
  getTags() {
    const { tags } = this.state; // destructuring
    if (tags.length === 0) {
      return <p>"No tags"</p>;
    }

    return (
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  // render
  render() {
    const { name, count, imageUrl, tags } = this.state; // destructuring or use this.state.name

    return (
      <div className='p-2'>

        {/* embed string */}
        <p>
          hello {name} {this.state.name}
        </p>

        {/* render image */}
        <img src={imageUrl} />

        {/* inline styling */}
        <p style={{ fontSize: 20, color: "red" }}>
          inline styling {name} {this.state.name}
        </p>

        {/* load function */}
        <p>The count is {this.formatCount()}</p>

        {/* bootstrap styling */}
        <button className="btn btn-secondary btn-sm">bootstrap</button>
        <br></br>

        {/* Render class dynamically. Note: change count zero or not zero*/}
        <button className={this.getBadge(count)}>dynamic styling</button>

        {/* Render a List and have unique key for each item*/}
        <ul>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {/* Conditional Render a List */}
        {this.getTags()}

        {/* if expression */}
        {this.state.tags.length !==0 && "render if && expression"}
      </div>
    );
  }
}
export default HelloWorld;
