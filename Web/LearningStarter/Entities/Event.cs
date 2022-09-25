﻿using System;

namespace LearningStarter.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public int CalendarId { get; set; }
        public string Name { get; set; }
        public string EventDetails { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
    public class EventGetDto
    {
        public int Id { get; set; }
        public int CalendarId { get; set; }
        public string Name { get; set; }
        public string EventDetails { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
    public class EventCreateDto
    {
        public int Id { get; set; }
        public int CalendarId { get; set; }
        public string Name { get; set; }
        public string EventDetails { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
    public class EventUpdateDto
    {
        public int CalendarId { get; set; }
        public string Name { get; set; }
        public string EventDetails { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
}