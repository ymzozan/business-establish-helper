import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ayarlar</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Genel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Platform Sürümü</p>
              <p className="text-sm text-gray-500">Faz 1 - Kuyumcu Sektörü</p>
            </div>
            <Badge>v1.0.0</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Aktif Sektörler</p>
              <p className="text-sm text-gray-500">
                Şu anda yalnızca kuyumcu sektörü aktif
              </p>
            </div>
            <Badge variant="secondary">1 sektör</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bildirim Ayarları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">E-posta Bildirimleri</p>
              <p className="text-sm text-gray-500">
                Resend API ile e-posta gönderimi
              </p>
            </div>
            <Badge variant="outline">Yapılandırılmadı</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">WhatsApp Bildirimleri</p>
              <p className="text-sm text-gray-500">
                Twilio ile WhatsApp mesaj gönderimi
              </p>
            </div>
            <Badge variant="outline">Yapılandırılmadı</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
