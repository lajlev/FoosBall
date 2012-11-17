﻿namespace FoosBall.Main
{
    using System;

    using FoosBall.Models;

    using MongoDB.Bson;

    using SignalR.Client;

    public class Events
    {
        public static void SubmitEvent(string action, string type, object targetObject, BsonObjectId userId)
        {
            var url = "http://" + System.Web.HttpContext.Current.Request.Url.Host + ":" + System.Web.HttpContext.Current.Request.Url.Port + "/Events";
            var connection = new Connection(url);
            connection.Start();
            connection.Send("adfarvaaeraweg");
            SaveEvent(action, type, targetObject, userId);
        }

        private static void SaveEvent(string action, string type, object targetObject, BsonObjectId userId)
        {
            if (string.IsNullOrEmpty(action) == false && string.IsNullOrEmpty(type) == false && targetObject != null)
            {
                var dbh = new Db(AppConfig.GetEnvironment()).Dbh;
                var eventCollection = dbh.GetCollection<Event>("Events");

                var newEvent = new Event
                {
                    Action = action,
                    Type = type,
                    Created = new BsonDateTime(DateTime.Now),
                    CreatedBy = userId
                };

                if (type.ToLower() == "player")
                {
                    newEvent.Player = (Player)targetObject;
                }

                if (type.ToLower() == "match")
                {
                    newEvent.Match = (Match)targetObject;
                }

                eventCollection.Insert(newEvent);
            }
        }
    }
}