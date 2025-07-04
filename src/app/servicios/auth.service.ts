import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    // Detectar si hay usuario logueado
    onAuthStateChanged(this.auth, user => {
      this.usuarioActualSubject.next(user);
    });
  }

  // 🔐 Registrar usuario nuevo
  registrar(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // 🔐 Iniciar sesión
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🔓 Cerrar sesión
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // 👤 Obtener el observable del usuario actual
  get usuarioActual$() {
    return this.usuarioActualSubject.asObservable();
  }

  // 👤 Obtener directamente el UID o null
  get uidActual(): string | null {
    return this.auth.currentUser?.uid ?? null;
  }
}
