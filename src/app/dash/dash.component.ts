import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  constructor(private fb: FormBuilder, private apiservice: ApiService) { }
  UserSignupform!: FormGroup;
  UserSigninform!: FormGroup;
  UserSignoutform!: FormGroup;
  CreatePostform!: FormGroup;
  subUserSignup = false;
  subSigninform = false;
  subSignoutform = false;
  subPostform = false;
  selectedPostFile: File | any = null;
  selectedUserProfile: File | any = null;
  innerHtmlData1: any;
  innerHtmlData2: any;
  jobListData: any;

  ngOnInit(): void {
    this.allForInisilization();
    this.GetJobList();
  }

  get fup() { return this.UserSignupform.controls; }
  get fin() { return this.UserSigninform.controls; }
  get fut() { return this.UserSignoutform.controls; }
  get crp() { return this.CreatePostform.controls; }

  UserSignup(): void {
    this.subUserSignup = true;
    if (this.UserSignupform.invalid) { return; }
    const formData = new FormData();
    formData.append("first_name", this.UserSignupform?.value?.first_name);
    formData.append("last_name", this.UserSignupform?.value?.last_name);
    formData.append("email", this.UserSignupform?.value?.email);
    formData.append("username", this.UserSignupform?.value?.username);
    formData.append("password", this.UserSignupform?.value?.password);
    formData.append("phone", this.UserSignupform?.value?.phone);
    formData.append("address", this.UserSignupform?.value?.address);
    formData.append("city", this.UserSignupform?.value?.city);
    formData.append("state", this.UserSignupform?.value?.state);
    formData.append("zip_code", this.UserSignupform?.value?.zip_code);
    formData.append("country", this.UserSignupform?.value?.country);
    formData.append("birth_date", this.UserSignupform?.value?.birth_date);
    formData.append("site_url", this.UserSignupform?.value?.site_url);
    formData.append("gender", this.UserSignupform?.value?.gender);
    formData.append("profile_img", this.selectedUserProfile);
    this.Signup(formData);
  }

  Signup(data: any) {
    this.apiservice.SignupUser(data).subscribe((res: any) => {
      console.log('user', res);
    }, (err) => { });
  }

  SignupReset(): void {
    this.subUserSignup = false;
    this.UserSignupform.reset();
  }

  allForInisilization() {
    this.UserSignupform = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
        phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
        country: ['', Validators.required],
        birth_date: ['', Validators.required],
        site_url: ['', Validators.required],
        gender: ['', Validators.required],
      }
    );

    this.UserSigninform = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    );

    this.UserSignoutform = this.fb.group(
      {
        username: ['', Validators.required],
      }
    );

    this.CreatePostform = this.fb.group(
      {
        title: ['', Validators.required],
        body: ['', Validators.required],
        image: [''],
      }
    );
  }

  UserSignin(): void {
    this.subSigninform = true;
    if (this.UserSigninform.invalid) {
      return;
    }
    this.Signin(this.UserSigninform.value);
  }

  Signin(data: any) {
    this.apiservice.SigninUser(data).subscribe((res: any) => {
      if (res) {
        this.apiservice.token.next(res?.token);
      }
    }, (err) => { });
  }

  SigninReset(): void {
    this.subSigninform = false;
    this.UserSigninform.reset();
  }

  UserSignout(): void {
    this.subSignoutform = true;
    if (this.UserSignoutform.invalid) {
      return;
    }
    this.Signout(this.UserSignoutform.value);
  }

  Signout(data: any) {
    this.apiservice.LogoutUser(data).subscribe((res: any) => {
      console.log('user', res);
    }, (err) => { });
  }

  SignoutReset(): void {
    this.subSignoutform = false;
    this.UserSignoutform.reset();
  }

  GetPost() {
    this.apiservice.getPostList().subscribe((res: any) => {
      console.log('posts:', res);
    }, (err) => { });
  }

  GetHtml(id: string) {
    this.apiservice.getDetailData(id).subscribe((res: any) => {
      const resData = res?.data?.detaildata;
      if (resData !== null) {
        let parser = new DOMParser();
        parser.parseFromString(resData, 'text/html');
        const tables = parser.parseFromString(res?.data?.detaildata, 'text/html').querySelectorAll('table');
        const tablesHTML = Array.from(tables).map(table => table.outerHTML);
        this.innerHtmlData1 = this.filtteredHtml(this.modifyHtmlContent(tablesHTML[0]));
        this.innerHtmlData2 = this.filtteredHtml(tablesHTML[1]);
      } else {
        this.innerHtmlData1 = null;
        this.innerHtmlData2 = null;
      }


    }, (err) => { });
  }

  modifyHtmlContent(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('tr');
    rows.forEach(row => {
      const firstTd = row.querySelector('td:first-child');
      if (firstTd) {
        firstTd.classList.add('job-detail');
      }
    });
    return doc.body.innerHTML;
  }

  GetJobList() {
    this.apiservice.getJobList().subscribe((res: any) => {
      if (res?.status) {
        this.jobListData = res?.data;
      }
    }, (err) => { });
  }

  filtteredHtml(tablesHTML: any): any {
    const excludedStrings = [
      "Android Apps",
      "Mobile Apps",
      "Video Hindi",
      "Join Our Telegram Page",
      "Join Our Telegram Channel",
      "Join Our Channel",
      "Join Sarkari Result Channel",
      "Image Resizer",
      "Other Tools",
      "Join Telegram Page",
      "https://www.sarkariresult.com"
    ];
    return tablesHTML
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/<center>/g, '')
      .replace(/<\/center>/g, '')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<ins\b[^<]*(?:(?!<\/ins>)<[^<]*)*<\/ins>/gi, '')
      .replace(/\s*style="[^"]*"/g, '')
      .replace(/<tr\b[^<]*(?:(?!<\/tr>)<[^<]*)*<\/tr>/gi, (tr: any) => { if (excludedStrings.some(str => tr.includes(str))) { return ''; } return tr; })
      .replace(/<tr\b[^<]*(?:(?!<\/tr>)<[^<]*)*<\/tr>/gi, (tr: any) => { const tdContent = tr.replace(/<td\b[^<]*(?:(?!<\/td>)<[^<]*)*<\/td>/gi, '').trim(); return tdContent === '' ? '' : tr; });
  }

  CreatePost(): void {
    this.subPostform = true;
    if (this.CreatePostform.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append("title", this.CreatePostform?.value?.title);
    formData.append("body", this.CreatePostform?.value?.title);
    formData.append("image", this.selectedPostFile);
    this.createPost(formData);
  }

  createPost(data: any) {
    this.apiservice.postscreate(data).subscribe((res: any) => {
      console.log('post', res);
    }, (err) => { });
  }

  CreatePostReset(): void {
    this.subPostform = false;
    this.CreatePostform.reset();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedPostFile = file;
  }

  onSelectedUpfile(event: any) {
    const file: File = event.target.files[0];
    this.selectedUserProfile = file;
  }

  // async getDetail(url: string) {
  //   const browser = await puppeteer.launch({ headless: true });
  //   const page = await browser.newPage();
  //   try {
  //     await page.goto(url, { waitUntil: 'load' });
  //     await page.waitForSelector('table', { visible: true });
  //     const extractedHTML = await page.evaluate(() => {
  //       const tables = document.querySelectorAll('table tbody tr td div table');
  //       const tablesHTML = Array.from(tables).map(table => table.outerHTML);
  //       const excludedStrings = [
  //         "Android Apps",
  //         "Mobile Apps",
  //         "Video Hindi",
  //         "Join Our Telegram Page",
  //         "Join Our Telegram Channel",
  //         "Join Our Channel",
  //         "Join Sarkari Result Channel",
  //         "Image Resizer",
  //         "Other Tools",
  //         "Join Telegram Page",
  //         "https://www.sarkariresult.com"
  //       ];
  //       const cleanedHTML = tablesHTML.map(html => {
  //         return html
  //           .replace(/<center>/g, '')
  //           .replace(/<\/center>/g, '')
  //           .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  //           .replace(/<ins\b[^<]*(?:(?!<\/ins>)<[^<]*)*<\/ins>/gi, '')
  //           .replace(/\s*style="[^"]*"/g, '')
  //           .replace(/<tr\b[^<]*(?:(?!<\/tr>)<[^<]*)*<\/tr>/gi, (tr) => { if (excludedStrings.some(str => tr.includes(str))) { return ''; } return tr; })
  //           .replace(/<tr\b[^<]*(?:(?!<\/tr>)<[^<]*)*<\/tr>/gi, (tr) => { const tdContent = tr.replace(/<td\b[^<]*(?:(?!<\/td>)<[^<]*)*<\/td>/gi, '').trim(); return tdContent === '' ? '' : tr; })
  //       });
  //       return cleanedHTML.join('\n');
  //       // return tablesHTML.join('\n');
  //     });
  //     if (!extractedHTML) {
  //       throw new Error('Desired HTML element not found on the page');
  //     }
  //     return extractedHTML;
  //   } catch (error) {
  //     throw new Error('Failed to fetch results');
  //   } finally {
  //     await browser.close();
  //   }
  // }



}
