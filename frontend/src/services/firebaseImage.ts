import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebase";
import { signInAnonymously } from "firebase/auth";

export async function uploadImageAndGetUrl(file: File): Promise<string> {
  try {
    // Auth durumunu kontrol et, giriş yapılmamışsa anonim giriş yap
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (authError) {
        console.warn("Anonim giriş yapılamadı, yine de yükleme deneniyor:", authError);
      }
    }

    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error: any) {
    console.error("Firebase Upload Error Details:", error);
    if (error.code === 'storage/unauthorized') {
      throw new Error("Yükleme izni reddedildi. Firebase Console'da Storage kurallarını kontrol edin veya Authentication'ı etkinleştirin.");
    }
    throw error;
  }
}
