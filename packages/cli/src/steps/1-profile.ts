// Step 1 — User profile builder

import { input, select, checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import type { UserProfile } from '../types.js';

export async function profileStep(): Promise<UserProfile> {
  console.log('');
  console.log(chalk.bold.cyan('1/6  Sən kimsən?'));
  console.log(chalk.dim('     AI köməkçi sənə görə uyğunlaşmaq üçün bu məlumatları istəyir.\n'));

  const name = await input({
    message: 'Adın?',
    validate: (v) => v.length >= 2 || 'Ad ən az 2 simvol olmalıdır',
  });

  const primaryLanguage = await select({
    message: 'Əsas dilin?',
    choices: [
      { name: 'Azərbaycan', value: 'az' },
      { name: 'English', value: 'en' },
      { name: 'Русский', value: 'ru' },
      { name: 'Türkçe', value: 'tr' },
      { name: 'Español', value: 'es' },
    ],
    default: 'az',
  });

  const otherLanguages = await checkbox({
    message: 'Başqa hansı dilləri də istifadə edirsən?',
    choices: [
      { name: 'English', value: 'en' },
      { name: 'Русский', value: 'ru' },
      { name: 'Türkçe', value: 'tr' },
      { name: 'Azərbaycan', value: 'az' },
      { name: 'Español', value: 'es' },
    ].filter((c) => c.value !== primaryLanguage),
  });

  const role = await input({
    message: 'Rolun? (məs. "AI creator", "tech founder", "SaaS developer")',
    validate: (v) => v.length >= 3 || 'Rol ən az 3 simvol',
  });

  const experience = await select({
    message: 'Təcrübə səviyyən?',
    choices: [
      { name: 'Yeni başlayıram (0-2 il)', value: 'beginner' },
      { name: 'Orta səviyyə (2-5 il)', value: 'intermediate' },
      { name: 'Təcrübəli (5-10 il)', value: 'advanced' },
      { name: 'Ekspert (10+ il)', value: 'expert' },
    ],
    default: 'intermediate',
  });

  const country = await input({
    message: 'Hansı ölkədə yaşayırsan?',
    default: 'Azerbaijan',
  });

  console.log('');
  console.log(chalk.dim('Hədəflərin (opsional — atla bilərsən):'));
  const sixMonth = await input({
    message: '6 aylıq hədəf?',
    default: '',
  });
  const twelveMonth = await input({
    message: '12 aylıq hədəf?',
    default: '',
  });
  const twentyFourMonth = await input({
    message: '24 aylıq hədəf?',
    default: '',
  });

  console.log('');
  console.log(chalk.green('✓ Profil yığıldı'));

  return {
    name,
    primaryLanguage,
    otherLanguages,
    role,
    experience: experience as UserProfile['experience'],
    country,
    goals: {
      sixMonth,
      twelveMonth,
      twentyFourMonth,
    },
  };
}
