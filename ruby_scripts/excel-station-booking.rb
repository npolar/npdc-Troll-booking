#!/usr/bin/env ruby
# Read from the incoming Station booking files to the station booking database
# Fetch Excel files from excel_download/start, reads thems and moves them to excel_download/done
#
# Author: srldl
#
# Requirements:
#
########################################

require './config'
require './server'
require 'net/http'
require 'net/ssh'
#require 'net/scp'
require 'time'
require 'date'
require 'json'
#require 'oci8'
require 'simple-spreadsheet'



module Couch

  class ExcelStationBooking

    #Get hold of UUID for database storage
    def self.getUUID(server)

       #Fetch a UUID from couchdb
       res = server.get("/_uuids")


       #Extract the UUID from reply
       uuid = (res.body).split('"')[3]

       #Convert UUID to RFC UUID
       uuid.insert 8, "-"
       uuid.insert 13, "-"
       uuid.insert 18, "-"
       uuid.insert 23, "-"
       return uuid
    end

    #Get a timestamp - current time
    def self.timestamp()
       a = (Time.now).to_s
       b = a.split(" ")
       c = b[0].split("-")
       dt = DateTime.new(c[0].to_i, c[1].to_i, c[2].to_i, 12, 0, 0, 0)
       return dt.to_time.utc.iso8601
    end


    #Get date, convert to iso8601
    #Does not handle chars as month such as 6.june 2015 etc
    #Does not handle day in the middle, such as 04/23/2014 etc
    def self.iso8601time(inputdate)
       a = (inputdate).to_s
       #puts "a " + a

       #Delimiter space, -, .,/
       b = a.split(/\.|\s|\/|-/)
       #Find out where the four digit is, aka year
       if b[0].size == 4 #Assume YYYY.MM.DD
             dt = DateTime.new(b[0].to_i, b[1].to_i, b[2].to_i, 12, 0, 0, 0)
       elsif b[2].size == 4  #Assume DD.MM.YYYY
            # puts b
            # puts "here's b"
             dt = DateTime.new(b[2].to_i, b[1].to_i, b[0].to_i, 12, 0, 0, 0)
       else
             puts "cannot read dateformat"
       end
             return dt.to_time.utc.iso8601
    end

     #Set server
    host = Couch::Config::HOST2
    port = Couch::Config::PORT2
    user = Couch::Config::USER2
    password = Couch::Config::PASSWORD2


    COUCH_DB_NAME = "station-booking"


    # do work on files ending in .xls in the desired directory
    Dir.glob('./excel_download/start/*.xlsx') do |excel_file|


     #Open the file
     s = SimpleSpreadsheet::Workbook.read(excel_file)

     #Always fetch the first sheet
     s.selected_sheet = s.sheets.first

     #Start down the form -after
     line = 4

     people = Array.new

     #Count down the lines
     while (line < (s.last_row).to_i)

             #Every time - get the person
             @people = Object.new
             @people = {
                :first_name =>  s.cell(line,3),
                :last_name =>   s.cell(line,3)
               # :organisation => s.cell(4,11),
               # :roles => s.cell(line,8)
             }  #end people


                  #Add people to people array
                  people.push(@people)

            #If new project
            if (s.cell(line,2)) != nil

                  #Get new title
                  title = s.cell(line,2)

                  #Create entry
                  @entry = {
                    :id => uuid,
                    :_id => uuid,
                    :schema => 'http://api.npolar.no/schema/' + Couch::Config::COUCH_DB_NAME + '.json',
                    :collection => Couch::Config::COUCH_DB_NAME,
                    :base => 'http://api.npolar.no',
                    :lang => 'en',
                    :draft => 'yes',
                    :research_station => "troll",
                    :research_type => "other",
                    :title => title,
                    :people => people,
                    :created_by => user,
                    :created => timestamp

                  #Get new array
                  people = Array.new

                  #Push entry to Couch database
                  doc = @entry.to_json
                  res = server.post("/"+ Couch::Config::COUCH_DB_NAME + "/", doc, user, password)

            end #if


          puts(s.cell(line,2))
          puts(s.cell(line,3))
          puts(s.cell(line,8))

          line = line+1

  end #while
end #excel_file

  end
end