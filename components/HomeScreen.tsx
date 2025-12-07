import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with mock data
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Emulate network delay
        await new Promise(resolve => setTimeout(() => resolve(true), 500));

        const mockData: Post[] = [
          {
            userId: 1,
            id: 1,
            title: 'Kütüphane Çalışma Saatleri',
            body: 'Vize haftası nedeniyle kütüphanemiz 24 saat açık olacaktır. Gece çorba ikramı yapılacaktır.',
          },
          {
            userId: 2,
            id: 2,
            title: 'Bahar Şenliği Duyurusu',
            body: 'Bu sene Bahar Şenliği 15 Mayıs haftasında yapılacak. Kulüp başvuruları Pazartesi başlıyor.',
          },
          {
            userId: 1,
            id: 3,
            title: 'Yemekhane Menüsü',
            body: 'Bugün çıkan yemekler: Mercimek Çorbası, Orman Kebabı, Pilav ve Ayran.',
          },
          {
            userId: 3,
            id: 4,
            title: 'Kayıp Eşya',
            body: 'A Blok kantininde mavi bir şemsiye unutulmuştur. Görenlerin güvenliğe bırakması rica olunur.',
          }
        ];

        setPosts(mockData);
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Akış Yenileniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.header}>Kampüs Gündemi</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#4b5563',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827',
  },
  body: {
    fontSize: 14,
    color: '#4b5563',
  },
});

export default HomeScreen;


