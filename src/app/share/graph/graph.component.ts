import { Component, OnInit } from '@angular/core';
import { AppUtilityService } from 'src/app/service/app-utility.service';

interface Rectangle {
  xPlot: number,
  yPlot: number,
  width: number,
  height: number,
  data: RectangleData
}

interface RectangleData {
  value: number,
  color: string,
  label: string
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  rectangleDataList: RectangleData[] = [
    { value: 35, color: '#2E112D', label: '#2E112D' },
    { value: 28, color: '#540032', label: '#540032' },
    { value: 20, color: '#820333', label: '#820333' },
    { value: 19, color: '#C9283E', label: '#C9283E' },
    { value: 14, color: '#F0433A', label: '#F0433A' }
  ];
  rectangles: Rectangle[] = [];

  constructor(public appUtilityService: AppUtilityService) {
    window.addEventListener('resize', (event: any) => {
      if (!event.originalEvent) {
        this.getTreemapRectangle()
      }
    });
  }
  
  getMaximumFromArray = (array: number[]) => Math.max(...array);
  getMinimumFromArray = (array:number[]) => Math.min(...array);
  sumReducer = (acc: number, cur: number) => acc + cur;
  roundValue = (number: number) => Math.max(Math.round(number * 100) / 100, 0);

  getTreemapRectangle() {
    let data: RectangleData[] = this.rectangleDataList;
    let graphContainer = document.getElementById('graphContainer') as HTMLDivElement;
    let width = graphContainer.clientWidth;
    let height = graphContainer.clientHeight;

    const worstRatio = (row: number[], width: number) => {
      const sum = row.reduce(this.sumReducer, 0);
      const rowMax = this.getMaximumFromArray(row);
      const rowMin = this.getMinimumFromArray(row);
      return Math.max(((width ** 2) * rowMax) / (sum ** 2), (sum ** 2) / ((width ** 2) * rowMin));
    }

    const getMinWidth = () => {
      if (defaultRectangle.totalHeight ** 2 > defaultRectangle.totalWidth ** 2) {
        return { value: defaultRectangle.totalWidth, vertical: false };
      } else {
        return { value: defaultRectangle.totalHeight, vertical: true };
      }
    };

    const layoutRow = (row: number[], width: number, vertical: boolean) => {
      const rowHeight = row.reduce(this.sumReducer, 0) / width;
  
      row.forEach((rowItem: number) => {
        let rowWidth = rowItem / rowHeight;
        let { xBeginning } = defaultRectangle;
        let { yBeginning } = defaultRectangle;
        let data: Rectangle;

        if (vertical) {
          data = {
            xPlot: xBeginning,
            yPlot: yBeginning,
            width: rowHeight,
            height: rowWidth,
            data: initialData[defaultRectangle.data.length],
          };

          defaultRectangle.yBeginning += rowWidth;
        } else {
          data = {
            xPlot: xBeginning,
            yPlot: yBeginning < 0 ? 0 : yBeginning,
            width: rowWidth,
            height: rowHeight,
            data: initialData[defaultRectangle.data.length],
          };

          defaultRectangle.xBeginning += rowWidth;
        }
        
        defaultRectangle.data.push(data);
      });
  
      if (vertical) {
        defaultRectangle.xBeginning += rowHeight;
        defaultRectangle.yBeginning -= width;
        defaultRectangle.totalWidth -= rowHeight;
      } else {
        defaultRectangle.xBeginning -= width;
        defaultRectangle.yBeginning += rowHeight;
        defaultRectangle.totalHeight -= rowHeight;
      }
    };

    const layoutLastRow = (rows:number[], children:any, width:number) => {
      const { vertical } = getMinWidth();
      layoutRow(rows, width, vertical);
      layoutRow(children, width, vertical);
    };

    const squarify:any = (children:number[], row:number[], width:number) => {
      if (children.length === 1) {
        return layoutLastRow(row, children, width);
      }
  
      const rowWithChild = [...row, children[0]];
  
      if (row.length === 0 || worstRatio(row, width) >= worstRatio(rowWithChild, width)) {
        children.shift();
        return squarify(children, rowWithChild, width);
      }
      layoutRow(row, width, getMinWidth().vertical);
      return squarify(children, [], getMinWidth().value);
    };

    let emptyNumArr: number[] = []
    let emptyObjArr: Rectangle[] = [];
    let defaultRectangle = {
      data: emptyObjArr,
      xBeginning: 0,
      yBeginning: 0,
      totalWidth: width,
      totalHeight: height,
    };

    let initialData = data;
    const totalValue = data.map((dataPoint) => dataPoint.value).reduce(this.sumReducer, 0);
    const dataScaled = data.map((dataPoint) => (dataPoint.value * height * width) / totalValue);
    
    squarify(dataScaled, emptyNumArr, getMinWidth().value);

    defaultRectangle.data.forEach((rectangle:Rectangle) => {
      let res:Rectangle = {
        xPlot: this.roundValue(rectangle.xPlot),
        yPlot: this.roundValue(rectangle.yPlot),
        width: this.roundValue(rectangle.width),
        height: this.roundValue(rectangle.height),
        data: rectangle.data
      }
      
      this.rectangles.push(res);
    })
  }

  ngOnInit(): void {
    this.getTreemapRectangle();
  }

  getTextXPosition(rectangle: Rectangle) {
    return rectangle.xPlot + 10;
  }

  getTextYPosition(rectangle: Rectangle) {
    return rectangle.yPlot + 25;
  }
}
