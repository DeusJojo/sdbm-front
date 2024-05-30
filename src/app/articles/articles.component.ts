import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') input!: ElementRef;

  private baseUrl: string = 'http://localhost:8090';

  public articles: any[] = [];
  public displayedColumns: string[] = [
    'name',
    'prixAchat',
    'volume',
    'titrage',
    'marque',
    'couleur',
    'vente',
  ];
  public dataSource = new MatTableDataSource<any>();
  public nameArticle?: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAllArticles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  redirectToVente(nomArticle: String){
    this.router.navigate(["/ventes"], {queryParams: {name: nomArticle}});
  }

  getArticleByName() {
    this.http
      .get(this.baseUrl + '/api/articles/' + this.nameArticle?.trim())
      .subscribe((res: any) => {
        if (res) {
          this.dataSource.data = res;
        }
      });
  }

  getAllArticles() {
    if(this.input){
      this.input.nativeElement.value = "";
    }
    this.http.get(this.baseUrl + '/api/articles').subscribe((res: any) => {
      if (res) {
        this.articles = res;
        this.dataSource.data = this.articles;
      }
    });
  }
}
