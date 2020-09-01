import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form Validation
  validationform: FormGroup;

  // Form Submission
  public submit: boolean;
  public formsubmit: boolean;
  public Allow = false;
  public usersList: any = [];

  constructor( 
    private modalService: NgbModal,  
    private formBuilder: FormBuilder,
    private _userService: UserService,
    ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Details', active: true }];

    this._fetchData();

    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
    this.submit = false;
  }

  /**
   * Customers data fetches
   */
  private _fetchData() {
    this._userService.getUsers().subscribe(users => this.usersList = users);
  }

  /**
   * Open center modal
   * @param centerDataModal center modal data
   */
  centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }

  /**
   * Returns form
   */
  get form() {
    return this.validationform.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
  }

}
