import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
//import * as crypto from "crypto";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  private code: string;
  private state: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {

      //let verifier = this.base64URLEncode(crypto.randomBytes(32));
      //let challenge = this.base64URLEncode(this.sha256(verifier));
      this.code = params['code'];
      this.state = params['state'];

      this.requestToken();

    });
  }

  requestToken() {
    this.authService.requestAcessToken(this.code, this.state).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/projects');
    });
  }




}
