PGDMP                       }            todoapp    17.2    17.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16387    todoapp    DATABASE     z   CREATE DATABASE todoapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Thai_Thailand.1252';
    DROP DATABASE todoapp;
                     postgres    false            �            1259    16389    tasks    TABLE     �   CREATE TABLE public.tasks (
    id integer NOT NULL,
    task_name character varying(255),
    completed boolean DEFAULT false
);
    DROP TABLE public.tasks;
       public         heap r       postgres    false            �            1259    16388    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public               postgres    false    218            �           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public               postgres    false    217            W           2604    16392    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    16389    tasks 
   TABLE DATA           9   COPY public.tasks (id, task_name, completed) FROM stdin;
    public               postgres    false    218   t
       �           0    0    tasks_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tasks_id_seq', 6, true);
          public               postgres    false    217            Z           2606    16395    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public                 postgres    false    218            �   *   x�3���OL�L�2��H���W(�/���8�! Ȏ���� �z     