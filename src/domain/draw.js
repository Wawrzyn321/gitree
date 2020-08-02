import { partition } from "./fileTree";

const lerp = (from, to, amount) => from + (to - from) * amount;

const line = (from, to, ctx) => {
  ctx.beginPath();
  ctx.moveTo(...from);
  ctx.lineTo(...to);
  ctx.stroke();
};

const drawName = (start, end, name, ctx) => {
  const boxWidth = end[0] - start[0];
  const boxHeight = end[1] - start[1];
  const minSize = 14;
  if (boxWidth < minSize || boxHeight < minSize) {
    return;
  }

  const margin = 1.05;
  const width = ctx.measureText(name).width * margin;

  let rotation = 0;
  if (boxWidth < width) {
    if (boxHeight < width) {
      if (Math.sqrt(boxWidth * boxWidth + boxHeight * boxHeight) < width) {
        return;
      }
    }
    rotation = Math.atan2(boxHeight, boxWidth);
    if (rotation > 1.3 /* magic */) rotation = Math.PI / 2;
  }
  const x = lerp(start[0], end[0], 0.5);
  const y = lerp(start[1], end[1], 0.5);
  ctx.fillStyle = 'black';

  if (rotation !== 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(name, 0, 0);
    ctx.restore();
  } else {
    ctx.fillText(name, x, y);
  }
}

const drawPartition = (arr, startPoint, endPoint, depth, ctx, paths, mainPaths) => {
  if (arr === null) return;
  depth++;

  const tryDoPartition = (obj, start, end) => {
    // paths nie jest przekazywane!
    let elements = obj.elements;
    while (Object.keys(elements).length === 1) {
      elements = elements[Object.keys(elements)[0]];
    }
    if (Object.keys(elements).length > 1) {
      const part = partition(elements, (s) => s.__size__);
      if (!part) {
        drawName(start, end, elements.__path__, ctx);
        const rectangle = new Path2D();
        ctx.beginPath();
        ctx.fillStyle = 'transparent';
        rectangle.rect(...start, end[0] - start[0], end[1] - start[1]);
        ctx.fill(rectangle);
        paths.push({
          shape: rectangle,
          elem: elements,
          start,
          end,
        });
      }
      drawPartition(part, start, end, depth, ctx, paths);
    }
  };

  const ratio = arr[0].__size__ / (arr[0].__size__ + arr[1].__size__);

  let firstEnd, secondStart;

  if (endPoint[0] - startPoint[0] > endPoint[1] - startPoint[1]) {
    const divPointX = lerp(endPoint[0], startPoint[0], ratio);
    firstEnd = [divPointX, endPoint[1]];
    secondStart = [divPointX, startPoint[1]];
  } else {
    const divPointY = lerp(endPoint[1], startPoint[1], ratio);
    firstEnd = [endPoint[0], divPointY];
    secondStart = [startPoint[0], divPointY];
  }
  line(firstEnd, secondStart, ctx);

  if (depth === 1) {
    {
      const rectangle = new Path2D();
      ctx.beginPath();
      ctx.fillStyle = 'transparent';
      rectangle.rect(...startPoint, firstEnd[0] - startPoint[0], firstEnd[1] - startPoint[1]);
      ctx.fill(rectangle);
      mainPaths.push({
        shape: rectangle,
        elem: arr[0],
        start: startPoint,
        end: firstEnd,
      });
    }

    {
      const rectangle = new Path2D();
      ctx.beginPath();
      ctx.fillStyle = 'transparent';
      rectangle.rect(
        ...secondStart,
        endPoint[0] - secondStart[0],
        endPoint[1] - secondStart[1]
      );
      ctx.fill(rectangle);
      mainPaths.push({
        shape: rectangle,
        elem: arr[1],
        start: secondStart,
        end: endPoint,
      });
    }
  }

  ctx.fillStyle = `rgba(0, 0, 0, ${0.15 / depth})`;
  ctx.fillRect(...startPoint, firstEnd[0] - startPoint[0], firstEnd[1] - startPoint[1])
  ctx.fillRect(...secondStart, endPoint[0] - secondStart[0], endPoint[1] - secondStart[1])

  tryDoPartition(arr[0], startPoint, firstEnd);
  tryDoPartition(arr[1], secondStart, endPoint);
};

const findPathOver = (e, ctx, paths) => {
  for (const path of paths) {
    if (ctx.isPointInPath(path.shape, e.offsetX, e.offsetY)) {
      return path;
    }
  }
  return null;
}

export const draw = (tree, canvas, selection) => {
  console.log(tree);
  const part = partition(tree, (s) => s.__size__);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '10px Arial';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  const paths = [];
  const mainPaths = [];
  drawPartition(part, [0, 0], [canvas.width, canvas.height], 0, ctx, paths, mainPaths);

  let currentPath = null;
  canvas.addEventListener("mousemove", (e) => {
    const pathOver = findPathOver(e, ctx, e.shiftKey ? mainPaths : paths);
    if (currentPath !== pathOver) {
      currentPath = pathOver;
      if (currentPath === null) return;
      console.log(pathOver)
      selection.setAttribute('x', pathOver.start[0]);
      selection.setAttribute('y', pathOver.start[1]);
      selection.setAttribute('width', pathOver.end[0] - pathOver.start[0]);
      selection.setAttribute('height', pathOver.end[1] - pathOver.start[1]);
    }
  });

  canvas.addEventListener("click", (e) => {
    if (currentPath !== null) {
      draw(currentPath.elem.elements, canvas, selection)
    }
  });
  canvas.addEventListener("mouseleave", () => {
    selection.setAttribute('width', 0);
    selection.setAttribute('height', 0);
  });
};
