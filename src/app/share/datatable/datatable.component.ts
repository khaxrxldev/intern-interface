import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AppUtilityService } from 'src/app/service/app-utility.service';

interface columnDef {
  columnTitle?: string,
  columnName?: string,
  columnDisplay?: string,
  columnContent?: string,
  columnSortable?: boolean,
  columnFilterType?: string
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  constructor(private appUtilityService: AppUtilityService) {}

  @Input() customColumn: boolean = false;
  @Input() customColumnContent!: string;
  @Input() columns: columnDef[] = [];
  @Input() data: any[] = [];
  @Input() rowSizeOptions: number[] = [10, 25, 50, 100];

  tableData: any[] = [];
  filterData: any[] = []
  currentPage: number = 0;
  rowSize: number = 10;
  sortOrder: string = 'ASC';
  sortColumn: number = 0;

  filterInput!: HTMLInputElement;

  ngOnInit(): void {
    // this.renderTable(this.sortTable(this.sortColumn, this.data));

    this.filterInput = document.getElementById('input') as HTMLInputElement;
    this.filterTable(this.filterInput.value);
    
    this.filterInput.addEventListener('input', () => {
      this.filterTable(this.filterInput.value);
      this.currentPage = 0;
    });

    const prevButton = document.getElementById('prev') as HTMLButtonElement;
    const nextButton = document.getElementById('next') as HTMLButtonElement;

    prevButton.addEventListener('click', () => {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
        this.filterTable(this.filterInput.value);
      }
    });

    nextButton.addEventListener('click', () => {
      if (this.filterData.length > this.rowSize) {
        if((this.currentPage * this.rowSize) <= this.filterData.length) {
          this.currentPage += 1;
          this.filterTable(this.filterInput.value);
        }
      }
    });
  }

  setTableColumnOrder(columnNumber: number) {
    if (this.sortColumn == columnNumber) {
      this.sortOrder = this.sortOrder == 'ASC' ? "DEC" : "ASC";
    } else {
      this.sortOrder = "ASC"
    }

    this.sortColumn = columnNumber;
    this.filterTable(this.filterInput.value);
  }
  
  filterTable(inputValue: string) {
    this.filterData = [];
    console.log(this.data)
    let filterValue = inputValue.toLowerCase().trim();
    this.sortTable(this.sortColumn, this.data).forEach((row: any) => {
      let status: boolean = false;

      this.columns.forEach((column: columnDef) => {
        let columnContent = row[column.columnName as keyof any]!;
        if (column.columnDisplay === 'DB' && columnContent) {
          switch (column.columnFilterType) {
            case 'PARTIAL':
              if (columnContent.toString().toLowerCase().trim().indexOf(filterValue) > -1) {
                status = true;
              }
              break;
            case 'EXACT':
              if (columnContent.toString().toLowerCase().trim() === filterValue) {
                status = true;
              }
              break;
          }
        } else if (column.columnDisplay === 'HTML' && columnContent) {
          if (this.appUtilityService.extractContent(columnContent).toString().toLowerCase().trim().indexOf(filterValue) > -1) {
            status = true;
          }
        }
      });
      // Object.keys(row).forEach((key:string) => {
      //   if (row[key as keyof any]!.toString().toLowerCase().trim().indexOf(filterValue) > -1) {
      //     status = true;
      //   }
      // });
      
      if (status) {
        this.filterData.push(row);
      }
    });
    
    this.renderTable(this.filterData);
  }

  renderTable(dataList: any[]) {
    this.tableData = [];

    const start = this.currentPage * this.rowSize;
    const end = start + this.rowSize;

    dataList.forEach((row: any, index: number) => {
      if (!(index < start || index >= end)) {
        this.tableData.push(row);
      }
    });
  }

  sortTable(sortColumnNumber: number, unsortedData: any[]) {
    let keys: string[] = Object.keys(unsortedData[0]);

    keys.forEach((row: string, index: number) => {
      if (index == sortColumnNumber) {
        unsortedData.sort(this.appUtilityService.sortArrayOfObjectByProperty(this.sortOrder, row));
      }
    })

    return unsortedData;
  }
}
