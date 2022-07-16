#include <napi.h>
#include <iostream>
#include <Windows.h>

Napi::Value get_video(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  // if (info.Length() != 1) {
  //   Napi::TypeError::New(env, "Wrong number of arguments")
  //       .ThrowAsJavaScriptException();
  //   return env.Null();
  // }
  // if (!info[0].IsNumber()) {
  //   Napi::TypeError::New(env, "Wrong argument").ThrowAsJavaScriptException();
  //   return env.Null();
  // }
  int x = info[0].As<Napi::Number>();
  int y = info[1].As<Napi::Number>();
  int w = info[2].As<Napi::Number>();
  int h = info[3].As<Napi::Number>();

  HDC hdc, hdcTemp;
  RECT rect;
  BYTE *bitPointer;

  hdc = GetDC(HWND_DESKTOP);
  GetWindowRect(0, &rect);

  hdcTemp = CreateCompatibleDC(hdc);

  BITMAPINFO bitmap;
  bitmap.bmiHeader.biSize = sizeof(bitmap.bmiHeader);
  bitmap.bmiHeader.biWidth = w;
  bitmap.bmiHeader.biHeight = -h;
  bitmap.bmiHeader.biPlanes = 1;
  bitmap.bmiHeader.biBitCount = 32;
  bitmap.bmiHeader.biCompression = BI_RGB;
  bitmap.bmiHeader.biSizeImage = w * 4 * h;
  bitmap.bmiHeader.biXPelsPerMeter = 0;
  bitmap.bmiHeader.biYPelsPerMeter = 0;
  bitmap.bmiHeader.biClrUsed = 0;
  bitmap.bmiHeader.biClrImportant = 0;
  HBITMAP hBitmap2 = CreateDIBSection(hdcTemp, &bitmap, DIB_RGB_COLORS,
                                      (void **)(&bitPointer), NULL, NULL);
  SelectObject(hdcTemp, hBitmap2);
  BitBlt(hdcTemp, 0, 0, w, h, hdc, x, y, SRCCOPY);
  Napi::Array Data = Napi::Array::New(env);
  for (int i = 0; i < (w * 4 * h); i += 4) {
    Data[i] = (int)bitPointer[i];
    Data[i + 1] = (int)bitPointer[i + 1];
    Data[i + 2] = (int)bitPointer[i + 2];
    Data[i + 3] = (int)bitPointer[i + 3];
  }
  return Data;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {

  exports.Set(Napi::String::New(env, "capture"),
              Napi::Function::New(env, get_video));
  return exports;
}

NODE_API_MODULE(addon, Init)