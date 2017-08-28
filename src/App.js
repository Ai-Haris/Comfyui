import React, { Component } from 'react';
import Form from "react-jsonschema-form";

import './App.css';


const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  "properties":{
    "title":{
      "type":"string",
      "maxLength":255
    },
    "slug":{
      "type":"string"
    },
    "description":{
      "type":"string",
      // "format":"html"
    },
    "addition":{
      "type":"string",
      // "format":"html"
    },
    "listicle_items":{
      "type":"array",
      "items":{
        "type":"object",
        "properties":{
          "title":{
            "type":"string",
            "maxLength":255
          },
          "subtitle":{
            "type":"string",
            "maxLength":255
          },
          "images":{
            "type":"array",
            "items":{
              "type":"object",
              "properties":{
                "title":{
                  "type":"string"
                },
                "description":{
                  "type":"string"
                },
                "url":{
                  "type":"string"
                },
                "license":{
                  "type":"string"
                }
              },
              "required":[
                "url"
              ],
              "additionalProperties":false
            },
            "minItems":1
          },
          "paragraphs":{
            "type":"array",
            "items":{
              "type":"string"
            }
          },
          "embeds":{
            "type":"array",
            "items":{
              "type":"object",
              "properties":{
                "content_type":{
                  "type":"string",
                  "enum":[
                    "youtube_video",
                    "twitter_post",
                    "facebook_post"
                  ]
                },
                "value":{
                  "type":"string"
                }
              },
              "required":[
                "content_type",
                "value"
              ],
              "additionalProperties":false
            }
          }
        },
        "required":[
          "title"
        ],
        "additionalProperties":false
      },
      "minItems":3
    }
  }
};

function ArrayFieldTemplate(props) {
  return (
    <div>
      {props.items.map(element => element.children)}
      {props.canAdd && <button type="button" onClick={props.onAddClick}>ADD</button>}
    </div>
  );
}

function CustomFieldTemplate(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  return (
    <div className="test">
      <label htmlFor={id}>{label}{required ? "*" : null}</label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

const log = (type) => console.log.bind(console, type);

const MyCustomWidget = (props) => {
  return (
    <input type="text"
      className="custom"
      value={props.value}
      required={props.required}
      onChange={(event) => props.onChange(event.target.value)} />
  );
};

const widgets = {
  myCustomWidget: MyCustomWidget
};

const uiSchema = {
    "title": {
        "ui:widget": "myCustomWidget"
    }
};

class App extends Component {
  render() {
    return (
      <div>
        <Form schema={schema}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")}
              FieldTemplate={CustomFieldTemplate}
              ArrayFieldTemplate={ArrayFieldTemplate}
              widgets={widgets}
              uiSchema={uiSchema} />
      </div>
    );
  }
}

export default App;
