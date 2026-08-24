export class BlogPostHelper {
  static createSlug(title: string): string {
    const slug = title
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `${slug}-${randomNumber}`;
  }
}
