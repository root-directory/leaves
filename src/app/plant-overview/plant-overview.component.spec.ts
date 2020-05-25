import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantOverviewComponent } from './plant-overview.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlantOverviewComponent', () => {
  let component: PlantOverviewComponent;
  let fixture: ComponentFixture<PlantOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: '', component: PlantOverviewComponent}
      ])],
      providers: [{
        useValue: {menu: [{label: 'care', path: '/forest/1/plant-overview'}]}
      }]
    });
    fixture = TestBed.createComponent(PlantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
