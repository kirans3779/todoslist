import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['id', 'title', 'userId','completed'];

  constructor(private http: HttpClient) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    // Fetch data from the API
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((data: any) => {
      this.dataSource.data = data;
      console.log(this.dataSource.data);
      
      this.dataSource.sort = this.sort;
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a,b):any => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'userid':
          return compare(a.userid, b.userId, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'completed':
          return compare(a.completed, b.completed, isAsc);
        default:
          return 0;
      }
    });
  }

  // Toggle task completion
  onTaskCompleted(task:any): void {
    task.completed = !task.completed;
  }
}
function compare(name: any, name1: any, isAsc: boolean) {
  throw new Error('Function not implemented.');
}

