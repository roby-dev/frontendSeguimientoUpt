import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlanEstudios } from '../models/plan.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarPlanes() {
    const url = `${base_url}/plan`;
    return this.http.get(url, this.headers).pipe(
      map((resp:{ok:boolean, planes:PlanEstudios[]}) => resp.planes)
    );
  }

  obtenerPlanPorId(id: string) {
    const url = `${base_url}/plan/id/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; plan: PlanEstudios }) => resp.plan));
  }

  crearPlan(plan: PlanEstudios) {
    const url = `${base_url}/plan`;
    return this.http.post(url, plan, this.headers);
  }

  actualizarPlan(plan: PlanEstudios) {
    const url = `${base_url}/plan/${plan._id}`;
    return this.http.put(url, plan, this.headers);
  }

  borrarPlan(_id: string) {
    const url = `${base_url}/plan/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
