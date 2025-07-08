import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    // Escuchar cambios en la sesión
    onAuthStateChanged(this.auth, (user) => {
      this.usuarioActualSubject.next(user);
    });
  }

  // 🔐 Registro de usuario
  registrar(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // 🔐 Login de usuario
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🔓 Logout
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // 👤 Observable del usuario actual (para el Navbar u otros)
  get usuarioActual$() {
    return this.usuarioActualSubject.asObservable();
  }

  // 👤 UID del usuario actual (para comparar con canciones u otros datos)
  get uidActual(): string | null {
    return this.usuarioActualSubject.value?.uid ?? null;
  }

  // 👤 Email del usuario actual (opcional)
  get emailActual(): string | null {
    return this.usuarioActualSubject.value?.email ?? null;
  }
}
