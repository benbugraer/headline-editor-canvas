import { Canvas, IText } from "fabric";

export const useCanvasShapes = (canvas: Canvas | null) => {
  const handleAddRectangle = () => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "#000000",
      width: 100,
      height: 100,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  };

  const handleAddCircle = () => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      fill: "#000000",
      radius: 50,
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  };

  const handleAddText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Yeni Metin", {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fontSize: 48,
      fill: "#000000",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const handleImageUpload = (file: File) => {
    if (!canvas) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target?.result as string, (img) => {
        img.scaleToWidth(200);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddIcon = (icon: string) => {
    if (!canvas) return;
    fabric.loadSVGFromURL(icon, (objects, options) => {
      const obj = fabric.util.groupSVGElements(objects, options);
      obj.scaleToWidth(50);
      canvas.add(obj);
      canvas.setActiveObject(obj);
      canvas.renderAll();
    });
  };

  return {
    handleAddRectangle,
    handleAddCircle,
    handleAddText,
    handleImageUpload,
    handleAddIcon,
  };
};
