import { AfterViewInit, Component, ViewChild, NgModule, Inject } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SpellsElement, ResultElement, SpellData } from 'src/app/models/spells-models';
import { ProjectsService } from './modules/shared/projects.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SpellsComponent } from './spells/spells/spells.component';
import { dataSharingService } from './modules/shared/data-service.service';
import { browser } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/* The main component is used to display the Spells list */
export class AppComponent implements AfterViewInit {

  /* Columns are used in the UI */
  displayedColumns: string[] = ['id', 'index', 'name', 'url', 'favourite'];

  /* Variables are used for storing and displaying the spells data */
  public sd: SpellData;
  spellsList: SpellData[] = [];
  favList: boolean[] = new Array(320);
  dataSource = new MatTableDataSource<SpellData>();

  /* API used for sorting and pagination */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /* Default constructor used for initialize the required services */
  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private dialog: MatDialog,
    private dsService: dataSharingService,
    //@Inject('Window') private readonly window: Window
  ) { }

  ngAfterViewInit() {
    /* Used for table pagination and sort methods */
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    /* As page loads call the service to fetch spells data from URL */
    this.getSpellsData();
  }

  /* Function is used to get spells data */
  getSpellsData() {
    this.projectsService.getSpellsDataList().subscribe(payloadResponse => {
      var data = payloadResponse.results;
      /* Get the favourites values from the cookies */
      var fava = this.getCookie("fav");
      /* check wether browser saved the cookies */
      if (fava == null) {
        /* For the first time store the cookies */
        this.setCookie("fav", this.favList, 30);
        fava = this.getCookie("fav");
      }
      /* Retrieve the cookies and converted into array */
      const arr = fava.split(',');
      /* Iterate the response for the Spells and do the Serialization and setting favourite flag */
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d.id = i + 1;
        if (arr[i + 1] !== '') {
          if (arr[i + 1] == 'true') {
            d.favourite = true;
            this.favList[i + 1] = true;
          }
          else {
            d.favourite = false;
            this.favList[i + 1] = false;
          }
        }
        else
          d.favourite = false;
        this.spellsList.push(d);
      }
      /* Save the response to the variable which is ued for UI */
      this.dataSource = new MatTableDataSource(this.spellsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {

    /**if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }*/
  }

  /* Function for the search */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /* Function to open dialog for selected URL */
  navigateTo(url: string) {
    this.dsService.setUrl(url);
    this.dialog.open(SpellsComponent, {
      data: {
        url: url
      },
      height: '560px',
      width: '1020px'
    });

  }

  /* Function for the setting for favourite */
  getActive(id: any) {
    var element = <HTMLInputElement>document.getElementById(id);
    this.favList[id] = element.checked;
    this.setCookie("fav", this.favList, 30);
    var fava = this.getCookie("fav");
    //this.bookmark();
  }

  /* Function for storing a favourite value in browser cookies */
  setCookie(name: string, value: boolean[], days: number) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  /* Function for retrieve favourite value from browser cookies */
  getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /*bookmark(title, url) {
    if (this.window.sidebar) { 
      // Firefox
      this.window.sidebar.addPanel(title, url, '');
    } 
    else if (this.window.opera && this.window.print) 
    { 
      // Opera
      var elem = document.createElement('a');
      elem.setAttribute('href', url);
      elem.setAttribute('title', title);
      elem.setAttribute('rel', 'sidebar');
      elem.click(); //this.title=document.title;
    } 
    else if (document.all) 
    { 
      // ie
      this.window.external.AddFavorite(url, title);
      this.window.location.href = "";
    }
  }*/


}