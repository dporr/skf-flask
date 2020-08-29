import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService  } from 'ngx-spinner';
import { Router } from '@angular/router';
import { KnowledgebaseService } from '../../../core/services/knowledgebase.service';
import { ChecklistCategoryService } from '../../../core/services/checklist_category.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewKnowledebaseComponent implements OnInit
{

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Collapse value
  public isCollapsed: boolean[] = [];
  public knowledgeData: any = [];
  public categoryData: any = [];
  public categoryId: any;
  public queryString;
  public delete: string;
  public catSelector: number;
  loggedinUser: string;
  loggedin = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private _knowledgebaseService: KnowledgebaseService,
    private _checklistCategoryService: ChecklistCategoryService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit()
  {
    this.breadCrumbItems = [{ label: 'Knowledgebase' }, { label: 'View', active: true }];
    this._fetchData();
    this.catSelector = Number(localStorage.getItem('categorySelector'));
  }

  /**
   * Knowledgebase data fetches
   */
  private _fetchData()
  {
    this.spinner.show();
    this._knowledgebaseService
      .getKnowledgeBaseItemsCollection(Number(localStorage.getItem('categorySelector')))
      .subscribe(data => {
        this.knowledgeData = data;
        this.spinner.hide();
      });

    this._checklistCategoryService
      .getChecklistCategoryCollection()
      .subscribe(data => this.categoryData = data);
  }

  loggedIn()
  {
    this.loggedinUser = sessionStorage.getItem('Authorization');
    this.loggedin = true;
    return this.loggedinUser;
  }

  deleteModal(deleteDataModal: any)
  {
    this.modalService.open(deleteDataModal, { centered: true });
  }

  // tslint:disable-next-line: ban-types
  setCategorySelectorId(categoryId: Number)
  {
    localStorage.setItem('categorySelector', categoryId.toString());
    this._fetchData();
  }

  deleteKnowledgebaseItem(id: number)
  {
    this._knowledgebaseService.deleteknowledgebaseItem(id).subscribe(x => this._fetchData());
  }

  onSubmit()
  {
    this.router.navigate(['/knowledgebase/view']);
  }
}