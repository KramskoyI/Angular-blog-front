import { PostsComponent } from './posts.component';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('Counter pages', () => {
  

  beforeEach( async () => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [PostsComponent],
      providers:[ HttpClient,  HttpHandler ]
      
    }).compileComponents();
  })

  it('Create', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
  
  it('CounterUp', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;
    const counter = app.counterUp(1)
    expect(counter).toBe(2);

  })
  it('CounterDown', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;
    const counter = app.counterDown(1)
    expect(counter).toBe(0);
  })
})
