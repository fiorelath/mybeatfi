import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duracion'
})
export class DuracionPipe implements PipeTransform {

  transform(valor: number): string {
    if (!valor && valor !== 0) return '0:00';

    // ✅ Separar parte entera (minutos) y parte decimal (fracción de minuto)
    const minutos = Math.floor(valor);
    const segundos = Math.round((valor - minutos) * 60);

    // ✅ Asegurar que los segundos siempre tengan dos dígitos
    const segundosStr = segundos.toString().padStart(2, '0');

    return `${minutos}:${segundosStr}`;
  }

}
