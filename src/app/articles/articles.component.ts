import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginator, MatPaginatorModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private configUrlGetAllArticles: string =
    'http://localhost:8090/api/articles';

  public articles: any[] = [];
  displayedColumns: string[] = ['name', 'prixAchat', 'volume', 'titrage', 'marque', 'couleur'];
  dataSource = new MatTableDataSource<any>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllManagers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllManagers() {
    this.http.get(this.configUrlGetAllArticles).subscribe((res: any) => {
      if (res) {
        this.articles = res;
        this.dataSource.data = this.articles;
        console.log(this.articles);
      }
    });
  }
  }
