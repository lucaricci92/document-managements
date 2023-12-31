import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  fileId: string | null = null;

  datafile: File

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    tipologia: new FormControl(null, [Validators.required]),
    obbligatorio: new FormControl(null, [Validators.required]),
    data: new FormControl(null, [Validators.required]),
    titleFile: new FormControl(null, [Validators.required]),
  });

  constructor(private route: ActivatedRoute,
    private service: ServiceService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.fileId = params.get('id');
    });
  }

  ngOnInit() {
    if (this.fileId) {
      this.service.getFile(this.fileId).subscribe({
        next: (response) => {
          this.datafile = response;
          this.form = this.createForm();
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Creazione di un nuovo file');
      this.datafile = {
        name: '',
        tipologia: '',
        obbligatorio: false,
        Base64: {
          data: '',
          title: '',
        }
      };
      this.form = this.createForm();
    }
  }
  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.datafile.name, [Validators.required]),
      tipologia: new FormControl(this.datafile.tipologia, [Validators.required]),
      obbligatorio: new FormControl(this.datafile.obbligatorio, [Validators.required]),
      data: new FormControl(this.datafile.Base64.data, [Validators.required]),
      titleFile: new FormControl(this.datafile.Base64.title, [Validators.required]),
    });
  }

  Submit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    const file: File = {
      name: this.form.value.name,
      tipologia: this.form.value.tipologia,
      obbligatorio: this.form.value.obbligatorio,
      Base64: {
        data: this.form.value.data,
        title: this.form.value.titleFile,
      }
    } as File;
    if (this.fileId) {
      this.service.updateFile(this.fileId, file).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/documents']);
        }
      });
    } else {
      this.service.createFile(file).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/documents']);
        }
      });
    }
  }
  onFileChange(event: any) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({
        titleFile: file.name,
        data: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }

  annulla() {
    this.router.navigate(['/documents']);
  }


}
interface File {
  name: string;
  tipologia: string;
  obbligatorio: boolean;
  Base64: {
    data: string;
    title: string;
  };
}
