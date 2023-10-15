import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { ModalComponent } from 'src/app/share/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userType!: string;
  @ViewChild('notiModal') notiModal!: ModalComponent;

  constructor(public router: Router, private internCoreService: InternCoreService, private appUtilityService: AppUtilityService) {
    this.userType = sessionStorage.getItem('userType')!;
  }

  sidenav!: HTMLElement;
  content!: HTMLElement;
  topnav!: HTMLElement;
  sidenavTextStatus: boolean = true;
  hideIconStatus: boolean = true;
  openIconStatus: boolean = false;

  studentsEvaluationStarted: StudentResponse[] = [];

  ngOnInit(): void {
    if (this.userType == 'ACD' || this.userType == 'IND') {
      this.internCoreService.retrieveEvaluationsStatus(sessionStorage.getItem('userType')!, sessionStorage.getItem('userId')!).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            this.studentsEvaluationStarted = res.data.students;

            if (this.studentsEvaluationStarted.length > 0 && !sessionStorage.getItem('notiDisplayStatus')) {
              this.notiModal.open(this.notiModal.childContent);
              sessionStorage.setItem('notiDisplayStatus', 'true');
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    this.sidenav = document.getElementById('sidenav') as HTMLElement;
    this.content = document.getElementById('content') as HTMLElement;
    this.topnav = document.getElementById('topnav') as HTMLElement;

    if (sessionStorage.getItem('sidebar-position')) {
      // use stored position
      switch (sessionStorage.getItem('sidebar-position')) {
        case 'min':
          this.setSidebar50px();
          break;
        case 'max':
          if (window.innerWidth > 500) {
            // min desktop - 220px
            this.setSidebar220px();
          } else {
            // min phone - 100%
            this.setSidebar100();
          }
          break;
      }
    } else {
      // use default position based on browser size
      if (window.innerWidth > 500) {
        // default browser - 220px
        this.setSidebar220px();
      } else {
        // default phone - 50px
        this.setSidebar50px();
      }
    }
  }

  toggle() {
    if (this.sidenav.style.width == '220px' || this.sidenav.style.width == '100%') {
      // minimize sidenav
      this.setSidebar50px();
      sessionStorage.setItem('sidebar-position', 'min');
    } else {
      // maximize sidenav
      sessionStorage.setItem('sidebar-position', 'max');
      if (window.innerWidth > 500) {
        // desktop browser size
        this.setSidebar220px();
      } else {
        // phone browser size
        this.setSidebar100();
      }
    }
  }

  setSidebar100() {
    this.sidenav.style.width = '100%';
    this.content.style.marginLeft = '0%';
    this.sidenavTextStatus = true;
    this.hideIconStatus = true;
    this.openIconStatus = false;
    this.topnav.style.width = '100%';
  }

  setSidebar220px() {
    this.sidenav.style.width = '220px';
    this.content.style.marginLeft = '220px';
    this.sidenavTextStatus = true;
    this.hideIconStatus = true;
    this.openIconStatus = false;
    this.topnav.style.width = 'calc(100% - 220px)';
  }

  setSidebar50px() {
    this.sidenav.style.width = '50px';
    this.content.style.marginLeft = '50px';
    this.sidenavTextStatus = false;
    this.hideIconStatus = false;
    this.openIconStatus = true;
    this.topnav.style.width = 'calc(100% - 50px)';
  }

  onSignout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
