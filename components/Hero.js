import { saveAs } from "file-saver";
import { useState } from "react";

export default function Hero() {
  const [status, setStatus] = useState(false);
  const [layerLength, setLayerLength] = useState(0);

  function generateInput(i) {
    if (i < 1) return;
    if (status) {
      document.getElementById("error").innerText =
        "Refresh the page and rewrite everything for generate a new json file. Click me for refresh the page.";
      document.getElementById("error").style.display = "block";
      return;
    }

    const div = document.createElement("div");
    div.setAttribute("id", `div${i}`);
    div.setAttribute("className", `d-flex`);

    const trait = document.createElement("input");
    trait.setAttribute("id", `trait${i}`);
    trait.setAttribute("placeholder", `trait${i}`);
    div.append(trait);

    const value = document.createElement("input");
    value.setAttribute("id", `value${i}`);
    value.setAttribute("placeholder", `value${i}`);
    div.append(value);

    document.getElementById("layers").append(div);
    setStatus(true);
  }

  const layerGenerator = () => {
    const length = document.getElementById("howManyLayers").value;
    for (let i = 1; i <= length; i++) {
      generateInput(i);
    }

    setLayerLength(length);
  };

  const download = () => {
    const jsonNumber = document.getElementById("jsonNumber").value;
    const collectionName = document.getElementById("collectionName").value;
    const collectionDesc = document.getElementById("collectionDesc").value;

    let baseData = {
      name: `${collectionName} #${jsonNumber}`,
      description: `${collectionDesc}`,
      image: "ipfs_link",
      edition: jsonNumber,
      attributes: [],
      compiler: "HashLips Art Engine",
    };

    let attributes = [];

    for (let i = 1; i <= layerLength; i++) {
      attributes.push({
        trait_type: document.getElementById(`trait${i}`).value,
        value: document.getElementById(`value${i}`).value,
      });
    }

    let data = { ...baseData, attributes: attributes };

    let fileName = `${jsonNumber}.json`;
    let fileToSave = new Blob([JSON.stringify(data, undefined, 2)], {
      type: "application/json",
    });

    saveAs(fileToSave, fileName);
  };

  return (
    <div className="global" id="global">
      <h1>Custom Metadata Generator</h1>
      <div>
        <input id="howManyLayers" placeholder="Layers Length" />
        <button onClick={() => layerGenerator()}>Generate</button>
      </div>
      <p onClick={() => location.reload()} id="error"></p>
      {status ? <h2 style={{ letterSpacing: "4px" }}>Layers</h2> : <></>}
      <div className="layers" id="layers"></div>

      {status ? (
        <>
          <div className="download">
            <input placeholder="Json Number (File Name)" id="jsonNumber" />
            <input placeholder="Collection Name" id="collectionName" />
            <input placeholder="Collection Description" id="collectionDesc" />
            <button onClick={() => download()}>Download</button>
          </div>
        </>
      ) : (
        <p className="info">
          How many layers do you want to write your metadata?
        </p>
      )}
    </div>
  );
}
