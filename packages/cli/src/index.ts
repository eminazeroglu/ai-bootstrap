// ai-bootstrap CLI — main entry
// Mərhələ B-1: skeleton
// Mərhələ B-2-də wizard implementasiyası başlanır

export async function main(): Promise<void> {
  console.log('🧠 ai-bootstrap');
  console.log('Mərhələ B-2-də implementasiya gəlir');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
