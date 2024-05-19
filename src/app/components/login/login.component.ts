import { Component, OnInit, NgZone } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  subscription: Subscription;

  constructor(private authService: AuthService, private zone: NgZone, private router: Router) {
    console.log("LoginComponent constructor");
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
  }

  doLogin() {
    console.log("doLogin");
    //Signin Logic
    this.authService.doFirebaseAuth();
    this.triggerFireBaseAuth();
  }

  triggerFireBaseAuth() {

    this.subscription = this.authService.subscribeFirebaseAuthStateChange().subscribe(data => {
      console.log("subscribeFirebaseAuthStateChange : ", data);
      if (data != null && data.verified == true) {
        this.subscription.unsubscribe();
        this.zone.run(() => { this.router.navigate(['/home/dashboard']); });
      }
    });
  }
};

