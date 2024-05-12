import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs, limit, orderBy,
  query, updateDoc, where
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore: Firestore) {}

  getPosts(orderByDirection: 'asc' | 'desc' = 'desc'): Observable<any[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, orderBy('date', orderByDirection));
    return collectionData(q);
  }

  async addPost(postData: Post): Promise<DocumentReference<DocumentData, DocumentData>> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, orderBy('post_id', 'desc'),
      limit(1));
    const querySnapshot = await getDocs(q);
    let maxId = 0;
    querySnapshot.forEach((doc) => {
      maxId = Math.max(maxId, doc.data()['post_id']);
    });
    postData.post_id = String(maxId + 1);
    return addDoc(postsCollection, postData);
  }

  async deletePost(postId: string): Promise<void> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('post_id', '==', postId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const snapshot = querySnapshot.docs[0];
      const postDoc = doc(this.firestore, 'posts', snapshot.id);
      return deleteDoc(postDoc);
    } else {
      throw new Error('Post not found');
    }
  }

  async getPostsByUid(uid: string, orderByDirection: 'asc' | 'desc' = 'desc'): Promise<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('userUID', '==', uid),
      orderBy('date', orderByDirection));
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    if (!querySnapshot.empty) {
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const post: Post = {
          title: data['title'],
          description: data['description'],
          videoUrl: data['videoUrl'],
          userUID: data['userUID'],
          date: data['date'],
          post_id: data['post_id']
        };
        posts.push(post);
      });
    }
    return posts;
  }

  async updatePost(postId: string, postData: any): Promise<void> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('post_id', '==', postId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const snapshot = querySnapshot.docs[0];
      const postDoc = doc(this.firestore, 'posts', snapshot.id);
      return updateDoc(postDoc, postData);
    } else {
      throw new Error('Post not found');
    }
  }

  getPost(postId: string): Observable<Post> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('post_id', '==', postId));
    return new Observable<Post>(observer => {
      getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const snapshot = querySnapshot.docs[0];
          const data = snapshot.data();
          const id = snapshot.id;
          observer.next({ id, ...data } as Post);
          observer.complete();
        } else {
          observer.error(new Error('Post not found'));
        }
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
