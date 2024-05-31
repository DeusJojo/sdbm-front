import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-ventes',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSortModule,
  ],
  templateUrl: './ventes.component.html',
  styleUrl: './ventes.component.scss',
})
export class VentesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') input!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;

  private baseUrl: string = 'http://localhost:8090';

  public displayedColumns: string[] = [
    'annee',
    'nomArticle',
    'volume',
    'quantite',
    'prixVente',
  ];

  public dataSource = new MatTableDataSource<any>();
  public articleName?: String;

  constructor(private http: HttpClient) {}

  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.articleName = params['name'];
    });

    if (this.articleName) {
      this.getVenteByName();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getVenteByName() {
    if (this.input) {
      this.input.nativeElement.value = '';
    }
    this.http
      .get(`${this.baseUrl}/api/vendres/${this.articleName}`)
      .subscribe((res: any) => {
        if (res) {
          this.dataSource.data = res;
          console.log(res);
        }
      });
  }

  getAllVendre() {
    this.http.get(this.baseUrl + '/api/vendres').subscribe((res: any) => {
      if (res) {
        this.dataSource.data = res;
      }
    });
  }
}
