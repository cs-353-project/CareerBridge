

delimiter |

CREATE TRIGGER welcome_user AFTER INSERT ON User
  FOR EACH ROW
  BEGIN
    INSERT INTO Notification(user_id, details) SELECT NEW.user_id as user_id, CONCAT("Welcome to CareerBridge, ", NEW.first_name, "!") as details;
  END;
|

delimiter ;

delimiter |
CREATE TRIGGER comment_on_post AFTER INSERT ON Comment
  FOR EACH ROW
  BEGIN
    INSERT INTO Notification(user_id, details) SELECT U.user_id as user_id, CONCAT(U.first_name, " ", U.last_name, " commented on your post") as details FROM Post P, User U WHERE P.post_id = NEW.post_id AND P.user_id = U.user_id;
  END;
|

delimiter ;
