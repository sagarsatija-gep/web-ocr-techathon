import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOcrPageComponent } from './details-ocr-page.component';

describe('DetailsOcrPageComponent', () => {
  let component: DetailsOcrPageComponent;
  let fixture: ComponentFixture<DetailsOcrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOcrPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOcrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
