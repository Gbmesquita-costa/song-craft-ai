"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

import { Separator } from "@/components/ui/separator";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Shield,
  Volume2,
  Piano,
  Upload,
  Download,
  Crown,
  Check,
  AlertTriangle,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

const mockUser = {
  name: "João Silva",
  email: "joao@email.com",
  avatar: "👨‍💻",
  plan: "Pro",
  planExpiry: "2024-02-22",
  instruments: ["piano", "guitar"],
  level: "intermediate",
  weeklyGoal: 300, // minutes
  joinedAt: "2024-01-15",
  totalSongs: 13,
  totalTime: 1247,
};

const mockSettings = {
  profile: {
    name: mockUser.name,
    email: mockUser.email,
    instruments: mockUser.instruments,
    level: mockUser.level,
    weeklyGoal: mockUser.weeklyGoal,
  },
  audio: {
    masterVolume: 80,
    metronomeVolume: 60,
    clickTrack: true,
    autoPlay: true,
  },
  practice: {
    defaultTempo: 80,
    showTips: true,
    autoAdvance: false,
    repeatSections: true,
    saveProgress: true,
  },
  notifications: {
    practiceReminders: true,
    weeklyReports: true,
    achievements: true,
    emailUpdates: false,
    pushNotifications: true,
  },
  privacy: {
    profilePublic: false,
    shareProgress: true,
    dataCollection: true,
  },
};

const DashboardSettings = () => {
  const [settings, setSettings] = useState(mockSettings);
  const [activeTab, setActiveTab] = useState("profile");

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    toast.success("Configurações salvas com sucesso!");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      )
    ) {
      toast.error("Funcionalidade em desenvolvimento");
    }
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">
          Gerencie sua conta e personalize sua experiência de aprendizado
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Preferências</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center space-x-2"
          >
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Plano</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacidade</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informações Pessoais</span>
              </CardTitle>
              <CardDescription>
                Atualize suas informações básicas de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div
                  className="w-20 h-20 bg-gradient-to-br 
                  from-purple-500 to-blue-500 rounded-full 
                  flex items-center justify-center text-2xl"
                >
                  {mockUser.avatar}
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Alterar Foto
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG, PNG ou GIF (máx. 2MB)
                  </p>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) =>
                      updateSetting("profile", "name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      updateSetting("profile", "email", e.target.value)
                    }
                  />
                </div>
              </div>

              <Separator />

              {/* Musical Profile */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Perfil Musical
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Instrumentos</Label>
                    <div className="flex flex-wrap gap-2">
                      {["piano", "guitar", "violin", "drums"].map(
                        (instrument) => (
                          <Button
                            key={instrument}
                            variant={
                              settings.profile.instruments.includes(instrument)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => {
                              const newInstruments =
                                settings.profile.instruments.includes(
                                  instrument
                                )
                                  ? settings.profile.instruments.filter(
                                      (i) => i !== instrument
                                    )
                                  : [
                                      ...settings.profile.instruments,
                                      instrument,
                                    ];
                              updateSetting(
                                "profile",
                                "instruments",
                                newInstruments
                              );
                            }}
                          >
                            {instrument === "piano" && "🎹"}
                            {instrument === "guitar" && "🎸"}
                            {instrument === "violin" && "🎻"}
                            {instrument === "drums" && "🥁"}
                            <span className="ml-2 capitalize">
                              {instrument}
                            </span>
                          </Button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Nível Musical</Label>
                      <Select
                        value={settings.profile.level}
                        onValueChange={(value) =>
                          updateSetting("profile", "level", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">🟢 Iniciante</SelectItem>
                          <SelectItem value="intermediate">
                            🔵 Intermediário
                          </SelectItem>
                          <SelectItem value="advanced">🔴 Avançado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Meta Semanal: {settings.profile.weeklyGoal} min
                      </Label>
                      <Slider
                        value={[settings.profile.weeklyGoal]}
                        onValueChange={(value) =>
                          updateSetting("profile", "weeklyGoal", value[0])
                        }
                        max={600}
                        min={60}
                        step={30}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500">
                        {Math.round(settings.profile.weeklyGoal / 7)} min/dia em
                        média
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="grid grid-cols-2 
                md:grid-cols-4 gap-4 text-center"
              >
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {mockUser.totalSongs}
                  </div>
                  <div className="text-sm text-blue-700">Músicas</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(mockUser.totalTime / 60)}h
                  </div>
                  <div className="text-sm text-green-700">Tempo Total</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">42</div>
                  <div className="text-sm text-purple-700">Sessões</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-orange-700">Conquistas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Configurações de Áudio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Volume Geral: {settings.audio.masterVolume}%</Label>
                  <Slider
                    value={[settings.audio.masterVolume]}
                    onValueChange={(value) =>
                      updateSetting("audio", "masterVolume", value[0])
                    }
                    max={100}
                    min={0}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Volume Metrônomo: {settings.audio.metronomeVolume}%
                  </Label>
                  <Slider
                    value={[settings.audio.metronomeVolume]}
                    onValueChange={(value) =>
                      updateSetting("audio", "metronomeVolume", value[0])
                    }
                    max={100}
                    min={0}
                    step={5}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Click Track</Label>
                    <p className="text-sm text-gray-500">
                      Som de metrônomo durante prática
                    </p>
                  </div>
                  <Switch
                    checked={settings.audio.clickTrack}
                    onCheckedChange={(checked) =>
                      updateSetting("audio", "clickTrack", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Play</Label>
                    <p className="text-sm text-gray-500">
                      Reproduzir automaticamente após carregar
                    </p>
                  </div>
                  <Switch
                    checked={settings.audio.autoPlay}
                    onCheckedChange={(checked) =>
                      updateSetting("audio", "autoPlay", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Piano className="w-5 h-5" />
                <span>Configurações de Prática</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Tempo Padrão: {settings.practice.defaultTempo} BPM
                  </Label>
                  <Slider
                    value={[settings.practice.defaultTempo]}
                    onValueChange={(value) =>
                      updateSetting("practice", "defaultTempo", value[0])
                    }
                    max={200}
                    min={40}
                    step={5}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mostrar Dicas</Label>
                    <p className="text-sm text-gray-500">
                      Exibir dicas contextuais durante prática
                    </p>
                  </div>
                  <Switch
                    checked={settings.practice.showTips}
                    onCheckedChange={(checked) =>
                      updateSetting("practice", "showTips", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Avançar Automaticamente</Label>
                    <p className="text-sm text-gray-500">
                      Ir para próxima seção ao completar
                    </p>
                  </div>
                  <Switch
                    checked={settings.practice.autoAdvance}
                    onCheckedChange={(checked) =>
                      updateSetting("practice", "autoAdvance", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Repetir Seções</Label>
                    <p className="text-sm text-gray-500">
                      Loop automático de seções difíceis
                    </p>
                  </div>
                  <Switch
                    checked={settings.practice.repeatSections}
                    onCheckedChange={(checked) =>
                      updateSetting("practice", "repeatSections", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Salvar Progresso</Label>
                    <p className="text-sm text-gray-500">
                      Salvar automaticamente progresso da sessão
                    </p>
                  </div>
                  <Switch
                    checked={settings.practice.saveProgress}
                    onCheckedChange={(checked) =>
                      updateSetting("practice", "saveProgress", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Preferências de Notificação</span>
              </CardTitle>
              <CardDescription>
                Configure como e quando você quer receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lembretes de Prática</Label>
                    <p className="text-sm text-gray-500">
                      Notificações diárias para manter consistência
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.practiceReminders}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "notifications",
                        "practiceReminders",
                        checked
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Relatórios Semanais</Label>
                    <p className="text-sm text-gray-500">
                      Resumo semanal do seu progresso
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      updateSetting("notifications", "weeklyReports", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Conquistas</Label>
                    <p className="text-sm text-gray-500">
                      Notificações quando desbloquear conquistas
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.achievements}
                    onCheckedChange={(checked) =>
                      updateSetting("notifications", "achievements", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Atualizações por Email</Label>
                    <p className="text-sm text-gray-500">
                      Novidades e atualizações do SongCraft AI
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailUpdates}
                    onCheckedChange={(checked) =>
                      updateSetting("notifications", "emailUpdates", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações Push</Label>
                    <p className="text-sm text-gray-500">
                      Notificações no navegador e dispositivos
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "notifications",
                        "pushNotifications",
                        checked
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5" />
                <span>Plano Atual</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="flex items-center justify-between p-6 
                bg-gradient-to-r from-purple-50 to-blue-50 
                rounded-lg border border-purple-200"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 bg-gradient-to-br 
                    from-purple-500 to-blue-500 rounded-lg 
                    flex items-center justify-center"
                  >
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">
                      Plano Pro
                    </h3>
                    <p className="text-purple-700">
                      R$ 29/mês • Renovação em {mockUser.planExpiry}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">∞</div>
                  <div className="text-sm text-green-700">
                    Músicas Ilimitadas
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">✓</div>
                  <div className="text-sm text-blue-700">Todos os Recursos</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-purple-700">
                    Suporte Priority
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button variant="outline">Alterar Plano</Button>
                <Button variant="outline">Ver Faturas</Button>
                <Button variant="outline">Cancelar Assinatura</Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Uso Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Transcrições este mês</span>
                    <span>8 de ∞</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tempo de prática</span>
                    <span>1.247 min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacidade e Dados</span>
              </CardTitle>
              <CardDescription>
                Controle como seus dados são usados e compartilhados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Perfil Público</Label>
                    <p className="text-sm text-gray-500">
                      Permitir que outros vejam seu perfil básico
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.profilePublic}
                    onCheckedChange={(checked) =>
                      updateSetting("privacy", "profilePublic", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compartilhar Progresso</Label>
                    <p className="text-sm text-gray-500">
                      Permitir comparações anônimas com outros usuários
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareProgress}
                    onCheckedChange={(checked) =>
                      updateSetting("privacy", "shareProgress", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Coleta de Dados</Label>
                    <p className="text-sm text-gray-500">
                      Permitir coleta de dados para melhorar o produto
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataCollection}
                    onCheckedChange={(checked) =>
                      updateSetting("privacy", "dataCollection", checked)
                    }
                  />
                </div>
              </div>

              <Separator />

              {/* Data Management */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Gerenciar Dados
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Meus Dados
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar Dados
                  </Button>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900">
                        Zona de Perigo
                      </h4>
                      <p className="text-sm text-red-700 mb-3">
                        Esta ação é irreversível e todos os seus dados serão
                        perdidos permanentemente.
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Conta
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? (
              <div
                className="w-4 h-4 border-2 border-white 
                border-t-transparent rounded-full 
                animate-spin mr-2"
              />
            ) : (
              <Check className="w-4 h-4 mr-2" />
            )}
            Salvar Alterações
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export { DashboardSettings };
