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

  datafile: File = {
    name: '',
    tipologia: '',
    obbligatorio: '',
    Base64: {
      data: '',
      title: '',
    }
  } as File;
  form: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute,
    private service: ServiceService,
    private router: Router
  ) {
    this.form = this.createForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fileId = params.get('id');
      if (this.fileId) {
        // Modifica del file con ID fileId
        console.log('Modifica del file con ID:', this.fileId);
        this.service.getFile(this.fileId).subscribe({
          next: (response) => {
            this.datafile = response;
            this.form = this.createForm();
          },
          error: (error) => {
            console.log(error);
          }
        }
        );
      } else {
        // Creazione di un nuovo file
        console.log('Creazione di un nuovo file');
        this.form = this.createForm();
      }


    });
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


}
interface File {
  name: string;
  tipologia: string;
  obbligatorio: string;
  Base64: {
    data: string;
    title: string;
  };
}
