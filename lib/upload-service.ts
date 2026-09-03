export async function uploadImage(file: File): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!file || file.size === 0) {
    throw new Error('Image upload failed.');
  }

  return `https://mock-storage.example.com/images/${file.name}`;
}
