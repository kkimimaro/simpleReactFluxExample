import React from "react";

class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newItem: "" };

    this.onInputChange = this.onInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onInputChange(e) {
    this.setState({ newItem: e.target.value });
  }
  onClick(e) {
    if (this.state.newItem) {
      this.props.onAddItem(this.state.newItem);
      this.setState({ newItem: "" });
    }
  }

  render() {
    let remove = this.props.onRemoveItem;
    return (
      <div className="wrapper fadeInDown">
        <div className="formContent">
          <h1>Список смартфонов</h1>
          <br />
          <img
            type="image"
            src="https://www.ixbt.com/img/n1/news/2020/10/4/gsmarena_005_large_0_large.jpg"
            id="icon"
            alt="User Icon"
            height="237"
            width="329"
          />
          <br />
          <input
            placeholder="Add something..."
            type="textInput"
            value={this.state.newItem}
            onChange={this.onInputChange}
          />
          <button className="btn btn-dark" onClick={this.onClick}>
            Добавить
          </button>

          <div>
            {this.props.phones.map(function (item) {
              return <Phone key={item} text={item} onRemove={remove} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      editModeEnabled: false,
      buttonText: "Редактировать",
    };
    this.onClick = this.onClick.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    this.setState({ editModeEnabled: !this.state.editModeEnabled });

    this.state.editModeEnabled && console.log(this.state.text);

    this.state.editModeEnabled === true
      ? (this.state.buttonText = "Редактировать")
      : (this.state.buttonText = "ОК");
  }

  onClick() {
    this.props.onRemove(this.state.text);
  }

  onEditChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onEditChange}
          disabled={!this.state.editModeEnabled}
          value={this.state.text}
        />
        <button className="btn btn-dark" onClick={this.onClick}>
          Удалить
        </button>
        <button className="btn btn-dark" onClick={this.handleEditClick}>
          {this.state.buttonText}
        </button>
      </div>
    );
  }
}

export default AppView;
