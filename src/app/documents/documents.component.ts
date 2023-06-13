import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  files: any[] = [];
  filteredFiles: any[] = [];
  filterControl: FormControl = new FormControl('');

  constructor(
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getFiles().subscribe(
      (response: any) => {
        this.files = response;
        this.filteredFiles = response;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.filterControl.valueChanges.subscribe(() => {
      this.filterTable();
    });
  }

  editFile(fileId: number | null) {
    if (fileId) {
      this.router.navigate(['/documents/create-edit', fileId]);
    } else {
      this.router.navigate(['/documents/create-edit']);
    }
  }

  filterTable() {
    const filterValue = this.filterControl.value.toLowerCase();
    this.filteredFiles = this.files.filter(file => file.name.toLowerCase().includes(filterValue));
  }
}
