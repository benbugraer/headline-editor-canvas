'use strict';

var React = require('react');
var fabric = require('fabric');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefault(React);
var fabric__namespace = /*#__PURE__*/_interopNamespace(fabric);

// src/components/HeadlineEditor.tsx
var HeadlineEditor = ({
  initialWidth = 1200,
  initialHeight = 630,
  onSave,
  onClose,
  defaultBackgroundColor = "#ffffff",
  defaultFontFamily = "Arial",
  defaultFontSize = 48,
  defaultTextColor = "#000000"
}) => {
  const canvasRef = React.useRef(null);
  const [canvasState, setCanvasState] = React.useState({
    canvas: null,
    backgroundColor: defaultBackgroundColor,
    objects: []
  });
  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric__namespace.Canvas(canvasRef.current, {
        width: initialWidth,
        height: initialHeight,
        backgroundColor: defaultBackgroundColor
      });
      setCanvasState((prev) => ({ ...prev, canvas }));
      return () => {
        canvas.dispose();
      };
    }
  }, [initialWidth, initialHeight, defaultBackgroundColor]);
  const addText = () => {
    if (canvasState.canvas) {
      const text = new fabric__namespace.IText("Yeni Metin", {
        left: 100,
        top: 100,
        fontFamily: defaultFontFamily,
        fontSize: defaultFontSize,
        fill: defaultTextColor
      });
      canvasState.canvas.add(text);
      canvasState.canvas.setActiveObject(text);
      canvasState.canvas.renderAll();
    }
  };
  const handleSave = () => {
    if (canvasState.canvas && onSave) {
      const dataUrl = canvasState.canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2
      });
      onSave(dataUrl);
    }
  };
  return /* @__PURE__ */ React__default.default.createElement("div", { className: "headline-editor" }, /* @__PURE__ */ React__default.default.createElement("div", { className: "toolbar" }, /* @__PURE__ */ React__default.default.createElement("button", { onClick: addText }, "Metin Ekle"), /* @__PURE__ */ React__default.default.createElement("button", { onClick: handleSave }, "Kaydet"), onClose && /* @__PURE__ */ React__default.default.createElement("button", { onClick: onClose }, "Kapat")), /* @__PURE__ */ React__default.default.createElement("canvas", { ref: canvasRef }));
};

exports.HeadlineEditor = HeadlineEditor;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map